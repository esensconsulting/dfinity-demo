import Map "mo:base/HashMap";
import Text "mo:base/Text";

actor {
    public func greet(name : Text) : async Text {
        return "Hello, " # name # "!";
    };
};
