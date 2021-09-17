interface ISerializable {
    Serialize(): string;
    Deserialize(jsonString: string): void;
}
export = ISerializable;