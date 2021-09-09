export const idlFactory = ({ IDL }) => {
  const Name = IDL.Text;
  const Phone = IDL.Text;
  const Entry = IDL.Record({
    'desc' : IDL.Text,
    'image' : IDL.Opt(IDL.Text),
    'phone' : Phone,
  });
  return IDL.Service({
    'greet' : IDL.Func([IDL.Text], [IDL.Text], []),
    'insert' : IDL.Func([Name, Entry], [], []),
    'lookup' : IDL.Func([Name], [IDL.Opt(Entry)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
