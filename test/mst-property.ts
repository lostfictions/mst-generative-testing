import * as jsc from 'jsverify'

import {
  TypeFlags,
  isType,
  isPrimitiveType,
  isArrayType,
  isMapType,
  isObjectType,
  // isFrozenType,
  isIdentifierType,
  isLateType,
  isLiteralType,
  isOptionalType,
  // isReferenceType,
  // isRefinementType,
  isUnionType
// HACK: enum and functions don't actually exist in the distributed npm module!
// } from 'mobx-state-tree/dist/types/type-flags'
} from './mst-src/types/type-flags'

// HACK: ...which means that any other types we import have to come
// from the same source.

// import { IType } from 'mobx-state-tree'
// import { ArrayType } from 'mobx-state-tree/dist/types/complex-types/array'
// import { MapType } from 'mobx-state-tree/dist/types/complex-types/map'
// import { ObjectType } from 'mobx-state-tree/dist/types/complex-types/object'
import { IType } from './mst-src/types/type'
import { ArrayType } from './mst-src/types/complex-types/array'
import { MapType } from './mst-src/types/complex-types/map'
import { ObjectType } from './mst-src/types/complex-types/object'

const typeCache = new WeakMap<IType<any, any>, jsc.Arbitrary<any>>()

function mstToJsc(type : IType<any, any>) : jsc.Arbitrary<any> {
  if(!isType(type)) {
    throw new TypeError('Parameter should be a type!')
  }

  let res : jsc.Arbitrary<any> | undefined = typeCache.get(type)
  if(res) {
    return res
  }

  res = getJsc(type)
  typeCache.set(type, res)

  return res
}

function getJsc(type : IType<any, any>) : jsc.Arbitrary<any> {
  /*
    TODO:
    isFrozenType(type)
    isReferenceType(type)
    isRefinementType(type)
  */

  // Some utility types must be checked before complex or primitive types,
  // since they'll match the cases below
  if(isLateType(type)) {
    return getJsc(type.subType)
  }
  if(isOptionalType(type)) {
    return jsc.either(
      getJsc(type.type),
      (typeof type.defaultValue === 'function')
        ? jsc.constant(type.defaultValue())
        : jsc.constant(type.defaultValue)
    )
  }
  if(isUnionType(type)) { //also handles enum types
    return jsc.sum(type.types.map(getJsc))
  }
  if(isLiteralType(type)) {
    return jsc.constant(type.value)
  }
  if(isIdentifierType(type)) {
    if((type.identifierType.flags & TypeFlags.String) === TypeFlags.String) {
      return jsc.string
    }
    if((type.identifierType.flags & TypeFlags.Number) === TypeFlags.Number) {
      return jsc.number
    }
    throw new TypeError(`Unknown identifier type: ${type.identifierType.describe()}`)
  }
  if(isPrimitiveType(type)) {
    switch(true) {
      case (type.flags & TypeFlags.String) === TypeFlags.String:
        return jsc.string
      case (type.flags & TypeFlags.Number) === TypeFlags.Number:
        return jsc.number
      case (type.flags & TypeFlags.Boolean) === TypeFlags.Boolean:
        return jsc.bool
      case (type.flags & TypeFlags.Date) === TypeFlags.Date:
        return jsc.datetime
    }
  }
  // HACK: the `isType` guards for complex types don't actually narrow to the
  // type in question, so we still have to import that type and cast to it.
  if(isArrayType(type)) {
    return jsc.array(getJsc((type as ArrayType<any, any>).subType))
  }
  if(isMapType(type)) {
    return jsc.dict(getJsc((type as MapType<any, any>).subType))
  }
  if(isObjectType(type)) {
    const record = {} as { [p : string] : jsc.Arbitrary<any> }
    for(const [propName, propType] of Object.entries((type as ObjectType<any, any>).properties)) {
      record[propName] = getJsc(propType)
    }
    return jsc.record(record)
  }

  throw new TypeError('Unrecognized type!')
}

export function property(description : string, ...types: any[]): jsc.Result<any> {
  const [prop] = types.splice(-1, 1)
  return jsc.property(
    description,
    ...types.map(mstToJsc),
    (...arbs : jsc.Arbitrary<any>[]) => prop(...arbs.map((a, i) => types[i].create(a)))
  )
}
