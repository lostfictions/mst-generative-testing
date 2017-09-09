import { ISimpleType } from "../type"
import { union } from "./union"
import { literal } from "./literal"
import { fail } from "../../utils"

// strongly typed enumeration forms (if there is a nicer way to do this in TS, PR welcome!
// signatures are generated using following script:

// console.log(Array(20).fill(0).map((_, length) => {
//     const args = Array(length + 2).fill(0).map((_, idx) => "E" + idx)
//     return `/* prettier-ignore */export function enumeration<${args.map(arg => arg + " extends string").join(", ")}>(name: string, options: [${args.join(", ")}]): ISimpleType<${args.join(" | ")}>
// /* prettier-ignore */export function enumeration<${args.map(arg => arg + " extends string").join(", ")}>(options: [${args.join(", ")}]): ISimpleType<${args.join(" | ")}>`
// }).join("\n"))

/* prettier-ignore */ export function enumeration<E0 extends string, E1 extends string>(name: string, options: [E0, E1]): ISimpleType<E0 | E1>
/* prettier-ignore */ export function enumeration<E0 extends string, E1 extends string>(options: [E0, E1]): ISimpleType<E0 | E1>
/* prettier-ignore */ export function enumeration<E0 extends string, E1 extends string, E2 extends string>(name: string, options: [E0, E1, E2]): ISimpleType<E0 | E1 | E2>
/* prettier-ignore */ export function enumeration<E0 extends string, E1 extends string, E2 extends string>(options: [E0, E1, E2]): ISimpleType<E0 | E1 | E2>
/* prettier-ignore */ export function enumeration<E0 extends string, E1 extends string, E2 extends string, E3 extends string>(name: string, options: [E0, E1, E2, E3]): ISimpleType<E0 | E1 | E2 | E3>
/* prettier-ignore */ export function enumeration<E0 extends string, E1 extends string, E2 extends string, E3 extends string>(options: [E0, E1, E2, E3]): ISimpleType<E0 | E1 | E2 | E3>
/* prettier-ignore */ export function enumeration<E0 extends string, E1 extends string, E2 extends string, E3 extends string, E4 extends string>(name: string, options: [E0, E1, E2, E3, E4]): ISimpleType<E0 | E1 | E2 | E3 | E4>
/* prettier-ignore */ export function enumeration<E0 extends string, E1 extends string, E2 extends string, E3 extends string, E4 extends string>(options: [E0, E1, E2, E3, E4]): ISimpleType<E0 | E1 | E2 | E3 | E4>
/* prettier-ignore */ export function enumeration<E0 extends string, E1 extends string, E2 extends string, E3 extends string, E4 extends string, E5 extends string>(name: string, options: [E0, E1, E2, E3, E4, E5]): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5>
/* prettier-ignore */ export function enumeration<E0 extends string, E1 extends string, E2 extends string, E3 extends string, E4 extends string, E5 extends string>(options: [E0, E1, E2, E3, E4, E5]): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5>
/* prettier-ignore */ export function enumeration<E0 extends string, E1 extends string, E2 extends string, E3 extends string, E4 extends string, E5 extends string, E6 extends string>(name: string, options: [E0, E1, E2, E3, E4, E5, E6]): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6>
/* prettier-ignore */ export function enumeration<E0 extends string, E1 extends string, E2 extends string, E3 extends string, E4 extends string, E5 extends string, E6 extends string>(options: [E0, E1, E2, E3, E4, E5, E6]): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6>
/* prettier-ignore */ export function enumeration<E0 extends string, E1 extends string, E2 extends string, E3 extends string, E4 extends string, E5 extends string, E6 extends string, E7 extends string>(name: string, options: [E0, E1, E2, E3, E4, E5, E6, E7]): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7>
/* prettier-ignore */ export function enumeration<E0 extends string, E1 extends string, E2 extends string, E3 extends string, E4 extends string, E5 extends string, E6 extends string, E7 extends string>(options: [E0, E1, E2, E3, E4, E5, E6, E7]): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7>
/* prettier-ignore */ export function enumeration<E0 extends string, E1 extends string, E2 extends string, E3 extends string, E4 extends string, E5 extends string, E6 extends string, E7 extends string, E8 extends string>(name: string, options: [E0, E1, E2, E3, E4, E5, E6, E7, E8]): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8>
/* prettier-ignore */ export function enumeration<E0 extends string, E1 extends string, E2 extends string, E3 extends string, E4 extends string, E5 extends string, E6 extends string, E7 extends string, E8 extends string>(options: [E0, E1, E2, E3, E4, E5, E6, E7, E8]): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8>
/* prettier-ignore */ export function enumeration<E0 extends string, E1 extends string, E2 extends string, E3 extends string, E4 extends string, E5 extends string, E6 extends string, E7 extends string, E8 extends string, E9 extends string>(name: string, options: [E0, E1, E2, E3, E4, E5, E6, E7, E8, E9]): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9>
/* prettier-ignore */ export function enumeration<E0 extends string, E1 extends string, E2 extends string, E3 extends string, E4 extends string, E5 extends string, E6 extends string, E7 extends string, E8 extends string, E9 extends string>(options: [E0, E1, E2, E3, E4, E5, E6, E7, E8, E9]): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9>
/* prettier-ignore */ export function enumeration<E0 extends string, E1 extends string, E2 extends string, E3 extends string, E4 extends string, E5 extends string, E6 extends string, E7 extends string, E8 extends string, E9 extends string, E10 extends string>(name: string, options: [E0, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10]): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10>
/* prettier-ignore */ export function enumeration<E0 extends string, E1 extends string, E2 extends string, E3 extends string, E4 extends string, E5 extends string, E6 extends string, E7 extends string, E8 extends string, E9 extends string, E10 extends string>(options: [E0, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10]): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10>
/* prettier-ignore */ export function enumeration<E0 extends string, E1 extends string, E2 extends string, E3 extends string, E4 extends string, E5 extends string, E6 extends string, E7 extends string, E8 extends string, E9 extends string, E10 extends string, E11 extends string>(name: string, options: [E0, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11]): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10 | E11>
/* prettier-ignore */ export function enumeration<E0 extends string, E1 extends string, E2 extends string, E3 extends string, E4 extends string, E5 extends string, E6 extends string, E7 extends string, E8 extends string, E9 extends string, E10 extends string, E11 extends string>(options: [E0, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11]): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10 | E11>
/* prettier-ignore */ export function enumeration<E0 extends string, E1 extends string, E2 extends string, E3 extends string, E4 extends string, E5 extends string, E6 extends string, E7 extends string, E8 extends string, E9 extends string, E10 extends string, E11 extends string, E12 extends string>(name: string, options: [E0, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12]): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10 | E11 | E12>
/* prettier-ignore */ export function enumeration<E0 extends string, E1 extends string, E2 extends string, E3 extends string, E4 extends string, E5 extends string, E6 extends string, E7 extends string, E8 extends string, E9 extends string, E10 extends string, E11 extends string, E12 extends string>(options: [E0, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12]): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10 | E11 | E12>
/* prettier-ignore */ export function enumeration<E0 extends string, E1 extends string, E2 extends string, E3 extends string, E4 extends string, E5 extends string, E6 extends string, E7 extends string, E8 extends string, E9 extends string, E10 extends string, E11 extends string, E12 extends string, E13 extends string>(name: string, options: [E0, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12, E13]): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10 | E11 | E12 | E13>
/* prettier-ignore */ export function enumeration<E0 extends string, E1 extends string, E2 extends string, E3 extends string, E4 extends string, E5 extends string, E6 extends string, E7 extends string, E8 extends string, E9 extends string, E10 extends string, E11 extends string, E12 extends string, E13 extends string>(options: [E0, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12, E13]): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10 | E11 | E12 | E13>
/* prettier-ignore */ export function enumeration<E0 extends string, E1 extends string, E2 extends string, E3 extends string, E4 extends string, E5 extends string, E6 extends string, E7 extends string, E8 extends string, E9 extends string, E10 extends string, E11 extends string, E12 extends string, E13 extends string, E14 extends string>(name: string, options: [E0, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12, E13, E14]): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10 | E11 | E12 | E13 | E14>
/* prettier-ignore */ export function enumeration<E0 extends string, E1 extends string, E2 extends string, E3 extends string, E4 extends string, E5 extends string, E6 extends string, E7 extends string, E8 extends string, E9 extends string, E10 extends string, E11 extends string, E12 extends string, E13 extends string, E14 extends string>(options: [E0, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12, E13, E14]): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10 | E11 | E12 | E13 | E14>
/* prettier-ignore */ export function enumeration<E0 extends string, E1 extends string, E2 extends string, E3 extends string, E4 extends string, E5 extends string, E6 extends string, E7 extends string, E8 extends string, E9 extends string, E10 extends string, E11 extends string, E12 extends string, E13 extends string, E14 extends string, E15 extends string>(name: string, options: [E0, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12, E13, E14, E15]): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10 | E11 | E12 | E13 | E14 | E15>
/* prettier-ignore */ export function enumeration<E0 extends string, E1 extends string, E2 extends string, E3 extends string, E4 extends string, E5 extends string, E6 extends string, E7 extends string, E8 extends string, E9 extends string, E10 extends string, E11 extends string, E12 extends string, E13 extends string, E14 extends string, E15 extends string>(options: [E0, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12, E13, E14, E15]): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10 | E11 | E12 | E13 | E14 | E15>
/* prettier-ignore */ export function enumeration<E0 extends string, E1 extends string, E2 extends string, E3 extends string, E4 extends string, E5 extends string, E6 extends string, E7 extends string, E8 extends string, E9 extends string, E10 extends string, E11 extends string, E12 extends string, E13 extends string, E14 extends string, E15 extends string, E16 extends string>(name: string, options: [E0, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12, E13, E14, E15, E16]): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10 | E11 | E12 | E13 | E14 | E15 | E16>
/* prettier-ignore */ export function enumeration<E0 extends string, E1 extends string, E2 extends string, E3 extends string, E4 extends string, E5 extends string, E6 extends string, E7 extends string, E8 extends string, E9 extends string, E10 extends string, E11 extends string, E12 extends string, E13 extends string, E14 extends string, E15 extends string, E16 extends string>(options: [E0, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12, E13, E14, E15, E16]): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10 | E11 | E12 | E13 | E14 | E15 | E16>
/* prettier-ignore */ export function enumeration<E0 extends string, E1 extends string, E2 extends string, E3 extends string, E4 extends string, E5 extends string, E6 extends string, E7 extends string, E8 extends string, E9 extends string, E10 extends string, E11 extends string, E12 extends string, E13 extends string, E14 extends string, E15 extends string, E16 extends string, E17 extends string>(name: string, options: [E0, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12, E13, E14, E15, E16, E17]): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10 | E11 | E12 | E13 | E14 | E15 | E16 | E17>
/* prettier-ignore */ export function enumeration<E0 extends string, E1 extends string, E2 extends string, E3 extends string, E4 extends string, E5 extends string, E6 extends string, E7 extends string, E8 extends string, E9 extends string, E10 extends string, E11 extends string, E12 extends string, E13 extends string, E14 extends string, E15 extends string, E16 extends string, E17 extends string>(options: [E0, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12, E13, E14, E15, E16, E17]): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10 | E11 | E12 | E13 | E14 | E15 | E16 | E17>
/* prettier-ignore */ export function enumeration<E0 extends string, E1 extends string, E2 extends string, E3 extends string, E4 extends string, E5 extends string, E6 extends string, E7 extends string, E8 extends string, E9 extends string, E10 extends string, E11 extends string, E12 extends string, E13 extends string, E14 extends string, E15 extends string, E16 extends string, E17 extends string, E18 extends string>(name: string, options: [E0, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12, E13, E14, E15, E16, E17, E18]): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10 | E11 | E12 | E13 | E14 | E15 | E16 | E17 | E18>
/* prettier-ignore */ export function enumeration<E0 extends string, E1 extends string, E2 extends string, E3 extends string, E4 extends string, E5 extends string, E6 extends string, E7 extends string, E8 extends string, E9 extends string, E10 extends string, E11 extends string, E12 extends string, E13 extends string, E14 extends string, E15 extends string, E16 extends string, E17 extends string, E18 extends string>(options: [E0, E1, E2, E3, E4, E5, E6, E7, E8, E9, E10, E11, E12, E13, E14, E15, E16, E17, E18]): ISimpleType<E0 | E1 | E2 | E3 | E4 | E5 | E6 | E7 | E8 | E9 | E10 | E11 | E12 | E13 | E14 | E15 | E16 | E17 | E18> // generic forms
export function enumeration(options: string[]): ISimpleType<string>
export function enumeration(name: string, options: string[]): ISimpleType<string>
/**
 * Can be used to create an string based enumeration.
 * (note: this methods is just sugar for a union of string literals)
 *
 * @example
 * const TrafficLight = types.model({
 *   color: types.enumeration("Color", ["Red", "Orange", "Green"])
 * })
 *
 * @export
 * @alias types.enumeration
 * @param {string} name descriptive name of the enumeration (optional)
 * @param {string[]} options possible values this enumeration can have
 * @returns {ISimpleType<string>}
 */
export function enumeration(name: string | string[], options?: any): ISimpleType<any> {
    const realOptions: string[] = typeof name === "string" ? options! : name
    // check all options
    if (process.env.NODE_ENV !== "production") {
        realOptions.forEach(option => {
            if (typeof option !== "string")
                fail("expected all options to be string, got " + type + " instead")
        })
    }
    const type = union(...realOptions.map(option => literal("" + option)))
    if (typeof name === "string") type.name = name
    return type
}
