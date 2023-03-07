import {  
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputRightElement,
    Button,
    InputGroup
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

import { Field, useField } from 'formik'
import { useState } from 'react'

const PasswordField = ({label, type, name, placeholder}) => {
    const [showPassword, setShowPasword] = useState(false)
    const [field, meta] = useField({type, name, placeholder})
  return (
    <FormControl isInvalid={meta.error && meta.touched} mb='6'>
        <FormLabel noOfLines={1}>{label}</FormLabel>
        <InputGroup>
        <Field as={Input} {...field} type={showPassword ? 'text' : type} name={name} placeholder={placeholder} />
        <InputRightElement h='full'>
            <Button variant='ghost' onClick={() => setShowPasword((showPassword) => !showPassword)}>{showPassword ? <ViewIcon /> : <ViewOffIcon /> }</Button>
        </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  )
}

export default PasswordField