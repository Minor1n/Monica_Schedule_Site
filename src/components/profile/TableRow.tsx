import React from 'react';
import IProfileTableRow from "@interfaces/components/IProfileTableRow";

const TableRow: React.FC<IProfileTableRow> = ({ label, value, children }) => {
    return (
        <tr className="fiveHeight">
            <td><b className="profileB">{label}</b></td>
            <td><b className="profileB">{value}</b></td>
            {children && <td><b className="profileB">{children}</b></td>}
        </tr>
    );
};

export default TableRow;