import Map "mo:base/HashMap";
import Text "mo:base/Text";

actor {
    type Name = Text;
    type Phone = Text;

    type Entry = {
        desc: Text;
        phone: Phone;
        image: ?Text;
    };

    let phonebook = Map.HashMap<Name, Entry>(0, Text.equal, Text.hash);

    public func insert(name : Name, entry : Entry): async () {
        phonebook.put(name, entry);
    };

    public query func lookup(name : Name) : async ?Entry {
        phonebook.get(name)
    };
    public func greet(name : Text) : async Text {
        return "Hello, " # name # "!";
    };
};
