import React from "react";

export default interface IProfileTableRow {
    label: string;
    value: React.ReactNode;
    children?: React.ReactNode;
}