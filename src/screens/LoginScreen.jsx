import {
    Box,
    Button, 
    Container, 
    FormControl,
    Heading,
    Stack,
    useBreakpoint,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    useToast
} from '@chakra-ui/react'

import { useEffect } from 'react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import PasswordField from '../components/PasswordField'
import TextField from '../components/TextField'
import { login } from '../redux/actions/userActions'

const LoginScreen = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const redirect = '/admin-console'
    const toast = useToast()

    const user = useSelector((state) => state.user)
    const { loading, error, userInfo } = user

    const headingBR = useBreakpoint({base : 'xs', md : 'sm'})
    const boxBR = useBreakpoint({ base : 'transparent', md : 'bg-surface'})

    useEffect(() => {
        window.scroll(0,0)
        if(userInfo) {
            if(location.state?.from) {
                navigate(location.state.from)
            } else {
                navigate(redirect)
            }
            toast({description : 'Login SuccessFul', status : 'success', isClosable : true})
        }
    },[userInfo, redirect, error, navigate, location.state, toast])
  return (
    <Formik
    initialValues={{email : '', password : ''}}
    validationSchema={Yup.object({
        email : Yup.string().email('Invalid email.').required('An email address is required'),
        password : Yup.string().min(1, 'Password is short - must contain at least 1 character.').required('Password is required')
    })}

    onSubmit={(values) => {
        dispatch(login(values.email, values.password))
    }}
    >
        {(formik) => (
            <Container maxW='lg' py={{ base : '12', md: '24'}} px={{base : '0', md : '8'}} minH='4xl'>
                <Stack spacing='8'>
                    <Stack spacing={{ base : '2', md : '3'}} textAlign='center'>
                        <Heading size={headingBR}>Admin accout</Heading>
                    </Stack>
                </Stack>
                <Box py={{base : '0', md : '8'}} px={{base : '4', md : '10'}} bg={{boxBR}} boxShadow={{base : 'none', md : 'xl'}}>
                    <Stack spacing='6' as='form' onSubmit={formik.handleSubmit}>
                        {error && (
                            <Alert status='error' flexDirection='column' alignItems='center' justifyContent='center' textAlign='center'>
                                <AlertIcon />
                                <AlertTitle>We are sorry!</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <Stack spacing='5'>
                            <FormControl>
                                <TextField  type='text' name='email' placeholder='youok@example.com' label='Email' />
                                <PasswordField type='password' name='password' placeholder='your password' label="Password" />
                            </FormControl>
                        </Stack>
                        <Stack spacing='6'>
                            <Button colorScheme='blue' size='lg' fontSize='md' isLoading={loading} type='submit'>Sign in</Button>
                        </Stack>
                    </Stack>
                </Box>
            </Container>
        )}

    </Formik>
  )
}

export default LoginScreen