import * as jsc from 'jsverify'

// HACK: the type-flags enum and functions don't actually exist in the
// distributed npm module, even though the definitions are there -- if
// we try to use them, we'll get a runtime error.

// as a quick hack, i've just dumped all of mobx-state-tree into this repo.
// not ideal, but it'll do for a proof-of-concept.

import {
  isType,
  TypeFlags,
  isPrimitiveType,
  isArrayType,
  isMapType,
  isObjectType,
  isLateType,
  isLiteralType,
  isOptionalType,
  isIdentifierType,
  isUnionType,
  // isFrozenType,
  // isReferenceType,
  // isRefinementType,
} from './mst-src/types/type-flags'

// HACK: ...unfortunately, any other types we import have to come from the same
// source -- typescript doesn't consider two different `IType`s compatible even
// if they match up structurally. so let's grab everything from our local version.
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
    return jsc.oneof([
      getJsc(type.type),
      (typeof type.defaultValue === 'function')
        ? jsc.constant(type.defaultValue())
        : jsc.constant(type.defaultValue)
    ])
  }
  if(isUnionType(type)) { //also handles enum types
    return jsc.oneof(type.types.map(getJsc))
  }
  if(isLiteralType(type)) {
    return jsc.constant(type.value)
  }
  if(isIdentifierType(type)) {
    // TODO: this is incomplete -- it may not allow testing a real tree
    // containing a reference to a node with an identifier. contingent
    // on also implementing generation for reference types.
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

type P<T> = IType<any, T> | jsc.Arbitrary<T>
export function property<A>(description: string, typeOrArb1: P<A>, prop: (t: A) => any): any
export function property<A, B>(description: string, typeOrArb1: P<A>, typeOrArb2: P<B>, prop: (t: A, u: B) => any): any;
export function property<A, B, C>(description: string, typeOrArb1: P<A>, typeOrArb2: P<B>, typeOrArb3: P<C>, prop: (t: A, u: B, v: C) => any): any;
export function property<A, B, C, D>(description: string, typeOrArb1: P<A>, typeOrArb2: P<B>, typeOrArb3: P<C>, typeOrArb4: P<D>, prop: (t: A, u: B, v: C, w: D) => any): any;
export function property<A, B, C, D, E>(description: string, typeOrArb1: P<A>, typeOrArb2: P<B>, typeOrArb3: P<C>, typeOrArb4: P<D>, typeOrArb5: P<E>, prop: (t: A, u: B, v: C, w: D, e: E) => any): any;
export function property<A, B, C, D, E, F>(description: string, typeOrArb1: P<A>, typeOrArb2: P<B>, typeOrArb3: P<C>, typeOrArb4: P<D>, typeOrArb5: P<E>, typeOrArb6: P<F>, prop: (t: A, u: B, v: C, w: D, e: E, a: F) => any): any;
export function property<A, B, C, D, E, F, G>(description: string, typeOrArb1: P<A>, typeOrArb2: P<B>, typeOrArb3: P<C>, typeOrArb4: P<D>, typeOrArb5: P<E>, typeOrArb6: P<F>, typeOrArb7: P<G>, prop: (t: A, u: B, v: C, w: D, e: E, a: F, b: G) => any): any;
export function property<A, B, C, D, E, F, G, H>(description: string, typeOrArb1: P<A>, typeOrArb2: P<B>, typeOrArb3: P<C>, typeOrArb4: P<D>, typeOrArb5: P<E>, typeOrArb6: P<F>, typeOrArb7: P<G>, typeOrArb8: P<H>, prop: (t: A, u: B, v: C, w: D, e: E, a: F, b: G, c: H) => any): any;
export function property<A, B, C, D, E, F, G, H, I>(description: string, typeOrArb1: P<A>, typeOrArb2: P<B>, typeOrArb3: P<C>, typeOrArb4: P<D>, typeOrArb5: P<E>, typeOrArb6: P<F>, typeOrArb7: P<G>, typeOrArb8: P<H>, typeOrArb9: P<I>, prop: (t: A, u: B, v: C, w: D, e: E, a: F, b: G, c: H, d: I) => any): any;
export function property<A, B, C, D, E, F, G, H, I, J>(description: string, typeOrArb1: P<A>, typeOrArb2: P<B>, typeOrArb3: P<C>, typeOrArb4: P<D>, typeOrArb5: P<E>, typeOrArb6: P<F>, typeOrArb7: P<G>, typeOrArb8: P<H>, typeOrArb9: P<I>, typeOrArb10: P<J>, prop: (t: A, u: B, v: C, w: D, e: E, a: F, b: G, c: H, d: I, f: J) => any): any;
export function property(description : string, ...typesOrArbs: any[]): jsc.Result<any> {
  const [prop] = typesOrArbs.splice(-1, 1)
  return jsc.property(
    description,
    ...typesOrArbs.map(t => isType(t) ? mstToJsc(t) : t),
    (...generatedValues : any[]) => prop(...generatedValues.map((val, i) => isType(typesOrArbs[i]) ? typesOrArbs[i].create(val) : val))
  )
}
