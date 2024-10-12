import React from "react";

export const enter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        const form = e.currentTarget.form;
        const index = Array.prototype.indexOf.call(form, e.currentTarget);
        const nextElement = form?.elements[index + 1] as HTMLInputElement | null;
        if (nextElement && nextElement.type !== 'submit') {
            nextElement.focus();
        }
        e.preventDefault();
    }
};