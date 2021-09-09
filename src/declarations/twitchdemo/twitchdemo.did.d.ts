import type { Principal } from '@dfinity/principal';
export interface Entry {
  'desc' : string,
  'image' : [] | [string],
  'phone' : Phone,
}
export type Name = string;
export type Phone = string;
export interface _SERVICE {
  'greet' : (arg_0: string) => Promise<string>,
  'insert' : (arg_0: Name, arg_1: Entry) => Promise<undefined>,
  'lookup' : (arg_0: Name) => Promise<[] | [Entry]>,
}
