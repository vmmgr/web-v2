export function StorageType(type: number): string {
    let typeStr = "不明";

    // Type:  1:SSD 2:HDD 3:NVMe 11:SSD(iSCSI) 12:HDD(iSCSI) 13:NVme(iSCSI)
    if (type === 1) {
        typeStr = "SSD";
    } else if (type === 2) {
        typeStr = "HDD";
    } else if (type === 3) {
        typeStr = "NVMe";
    }

    if (type / 10 === 1) {
        typeStr = "(iSCSI) " + typeStr
    }

    return typeStr;
}

