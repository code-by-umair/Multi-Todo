import React from 'react'

const Input = ({ value, onChange, placeholder, ...props }) => {
    return (
        <input
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="flex-1 p-2 border rounded-md focus:outline-blue-400 focus:ring-blue-400"
            {...props}
        />
    )
}

export default Input