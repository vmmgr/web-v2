import {Chip} from "@material-ui/core";
import React from "react";

export function VMStatus(props: { status: number }): any {
    const {status} = props;
    if (status === 0) {
        return (
            <Chip
                size="small"
                color={"secondary"}
                label="NO STATE"
            />
        );
    } else if (status === 1) {
        return (
            <Chip
                size="small"
                color="primary"
                label="起動中"
            />
        );
    } else if (status === 2) {
        return (
            <Chip
                size="small"
                color={"secondary"}
                label="BLOCKED(リソースブロック)"
            />
        );
    } else if (status === 3) {
        return (
            <Chip
                size="small"
                color={"secondary"}
                label="一時停止中"
            />
        );
    } else if (status === 4) {
        return (
            <Chip
                size="small"
                color={"secondary"}
                label="シャットダウン中"
            />
        );
    } else if (status === 5) {
        return (
            <Chip
                size="small"
                color={"secondary"}
                label="停止"
            />
        );
    } else if (status === 6) {
        return (
            <Chip
                size="small"
                color={"secondary"}
                label="Crashed"
            />
        );
    } else if (status === 7) {
        return (
            <Chip
                size="small"
                color={"secondary"}
                label="suspended by guest power management"
            />
        );
    }
}

