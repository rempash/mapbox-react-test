import React, { useCallback } from "react";

export const useSetOnChange = <T>(setterFn: React.Dispatch<React.SetStateAction<T|string>>) => {
    const onChangeHandler = useCallback(
        ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
            setterFn(value);
        },
        [setterFn]
    );

    return onChangeHandler;
};
