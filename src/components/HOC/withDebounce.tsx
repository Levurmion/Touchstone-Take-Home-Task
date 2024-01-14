import React, { ChangeEvent, ComponentType, InputHTMLAttributes, useRef } from "react";

type InputComponentType = ComponentType<InputHTMLAttributes<HTMLInputElement>>;
interface DebouncedInputProps extends InputHTMLAttributes<HTMLInputElement> {
    setChangeCb: (value: any) => void;
}

export default function withDebounce(WrappedInput: InputComponentType) {
    return (props: DebouncedInputProps) => {
        const prevChange = useRef<null | ReturnType<typeof setTimeout>>(null);

        const { setChangeCb, ...inputProps } = props;
        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
            if (prevChange.current) {
                clearTimeout(prevChange.current);
            }
            prevChange.current = setTimeout(() => {
                setChangeCb(e.target.value);
            }, 250);
        };

        return <WrappedInput {...inputProps} onChange={handleChange}/>;
    };
}
