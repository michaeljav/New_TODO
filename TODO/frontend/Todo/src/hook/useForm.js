import { useState } from "react";

export const useForm = (initialForm = {}) => {
    const [formState, setFormState] = useState(initialForm);

    const onInputChange = ({ target }) => {
        const { name, value } = target;

        setFormState((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onSetFormState = (name, value) => {
        //debo de tomar el valor presente que cambio.
        setFormState((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onResetForm = () => {
        setFormState(initialForm);
    };

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        onSetFormState,
    };
};
