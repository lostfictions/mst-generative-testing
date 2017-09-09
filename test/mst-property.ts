import * as jsc from 'jsverify'

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
// HACK: enum and functions don't actually exist in the distributed npm module,
// so we need to include the source in our repo...
} from './mst-src/types/type-flags' //'mobx-state-tree/dist/types/type-flags'

// HACK: ...which means that any other types we import have to come
// from the same source.
import { IType } from './mst-src/types/type' //'mobx-state-tree/dist/types/type-flags'
import { ArrayType } from './mst-src/types/complex-types/array' //'mobx-state-tree/dist/types/type-flags'
import { MapType } from './mst-src/types/complex-types/map' //'mobx-state-tree/dist/types/type-flags'
import { ObjectType } from './mst-src/types/complex-types/object' //'mobx-state-tree/dist/types/type-flags'

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

import { Property } from 'jsverify'
import { ISnapshottable } from './mst-src'
export function property<A, AA>(description: String, type1: IType<A, AA>, prop: (t: AA & ISnapshottable<A>) => Property<A>): any;
export function property<A, AA, B, BB>(description: String, type1: IType<A, AA>,type2: IType<B, BB>, prop: (t: AA & ISnapshottable<A>, u: BB & ISnapshottable<B>) => Property<any>): any;
export function property<A, AA, B, BB, C, CC>(description: String, type1: IType<A, AA>,type2: IType<B, BB>,type3: IType<C, CC>, prop: (t: AA & ISnapshottable<A>, u: BB & ISnapshottable<B>, v: CC & ISnapshottable<C>) => Property<any>): any;
export function property<A, AA, B, BB, C, CC, D, DD>(description: String, type1: IType<A, AA>,type2: IType<B, BB>,type3: IType<C, CC>,type4: IType<D, DD>, prop: (t: AA & ISnapshottable<A>, u: BB & ISnapshottable<B>, v: CC & ISnapshottable<C>, w: DD & ISnapshottable<D>) => Property<any>): any;
export function property<A, AA, B, BB, C, CC, D, DD, E, EE>(description: String, type1: IType<A, AA>,type2: IType<B, BB>,type3: IType<C, CC>,type4: IType<D, DD>,type5: IType<E, EE>, prop: (t: AA & ISnapshottable<A>, u: BB & ISnapshottable<B>, v: CC & ISnapshottable<C>, w: DD & ISnapshottable<D>, e: EE & ISnapshottable<E>) => Property<any>): any;
export function property<A, AA, B, BB, C, CC, D, DD, E, EE, F, FF>(description: String, type1: IType<A, AA>,type2: IType<B, BB>,type3: IType<C, CC>,type4: IType<D, DD>,type5: IType<E, EE>,type6: IType<F, FF>, prop: (t: AA & ISnapshottable<A>, u: BB & ISnapshottable<B>, v: CC & ISnapshottable<C>, w: DD & ISnapshottable<D>, e: EE & ISnapshottable<E>, a: FF & ISnapshottable<F>) => Property<any>): any;
export function property<A, AA, B, BB, C, CC, D, DD, E, EE, F, FF, G, GG>(description: String, type1: IType<A, AA>,type2: IType<B, BB>,type3: IType<C, CC>,type4: IType<D, DD>,type5: IType<E, EE>,type6: IType<F, FF>,type7: IType<G, GG>, prop: (t: AA & ISnapshottable<A>, u: BB & ISnapshottable<B>, v: CC & ISnapshottable<C>, w: DD & ISnapshottable<D>, e: EE & ISnapshottable<E>, a: FF & ISnapshottable<F>, b: GG & ISnapshottable<G>) => Property<any>): any;
export function property<A, AA, B, BB, C, CC, D, DD, E, EE, F, FF, G, GG, H, HH>(description: String, type1: IType<A, AA>,type2: IType<B, BB>,type3: IType<C, CC>,type4: IType<D, DD>,type5: IType<E, EE>,type6: IType<F, FF>,type7: IType<G, GG>,type8: IType<H, HH>, prop: (t: AA & ISnapshottable<A>, u: BB & ISnapshottable<B>, v: CC & ISnapshottable<C>, w: DD & ISnapshottable<D>, e: EE & ISnapshottable<E>, a: FF & ISnapshottable<F>, b: GG & ISnapshottable<G>, c: HH & ISnapshottable<H>) => Property<any>): any;
export function property<A, AA, B, BB, C, CC, D, DD, E, EE, F, FF, G, GG, H, HH, I, II>(description: String, type1: IType<A, AA>,type2: IType<B, BB>,type3: IType<C, CC>,type4: IType<D, DD>,type5: IType<E, EE>,type6: IType<F, FF>,type7: IType<G, GG>,type8: IType<H, HH>,type9: IType<I, II>, prop: (t: AA & ISnapshottable<A>, u: BB & ISnapshottable<B>, v: CC & ISnapshottable<C>, w: DD & ISnapshottable<D>, e: EE & ISnapshottable<E>, a: FF & ISnapshottable<F>, b: GG & ISnapshottable<G>, c: HH & ISnapshottable<H>, d: II & ISnapshottable<I>) => Property<any>): any;
export function property<A, AA, B, BB, C, CC, D, DD, E, EE, F, FF, G, GG, H, HH, I, II, J, JJ>(description: String, type1: IType<A, AA>,type2: IType<B, BB>,type3: IType<C, CC>,type4: IType<D, DD>,type5: IType<E, EE>,type6: IType<F, FF>,type7: IType<G, GG>,type8: IType<H, HH>,type9: IType<I, II>,type10: IType<J, JJ>, prop: (t: AA & ISnapshottable<A>, u: BB & ISnapshottable<B>, v: CC & ISnapshottable<C>, w: DD & ISnapshottable<D>, e: EE & ISnapshottable<E>, a: FF & ISnapshottable<F>, b: GG & ISnapshottable<G>, c: HH & ISnapshottable<H>, d: II & ISnapshottable<I>, f: JJ & ISnapshottable<J>) => Property<any>): any;
export function property(description : string, ...types: any[]): jsc.Result<any> {
  const [prop] = types.splice(-1, 1)
  return jsc.property(
    description,
    ...types.map(mstToJsc),
    (...arbs : jsc.Arbitrary<any>[]) => prop(...arbs.map((a, i) => types[i].create(a)))
  )
}
