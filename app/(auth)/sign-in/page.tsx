'use client'
import {toast} from "sonner";
import { useForm } from "react-hook-form"
import {useRouter} from "next/navigation";
import { Button } from "@/components/ui/button";
import InputField from "@/components/forms/InputField"
import FooterLink from "@/components/forms/FooterLink";
import {signInWithEmail} from "@/lib/actions/auth.actions";

const SignIn = () => {

const router =useRouter()

const {register, 
  handleSubmit,
  control,
  formState:{errors, isSubmitting},
}  = useForm<SignInFormData>({
  defaultValues:{
    email:'',
    password:''
  },
  mode:'onBlur'
})

const onSubmit = async(data: SignInFormData)=>{
  try{
    const result =await signInWithEmail(data)
    if(result.success) router.push('/')
  } catch(e){
    console.error(e);
    toast.error('Sing in failed',{
      description: e instanceof Error ? e.message : 'Failed to log in an account.'
    })
}
}

  return (
    <div className="flex flex-col gap-5">
            <h1 className="form-title">Welcome back</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            <InputField
                    name="email"
                    label="Email"
                    placeholder="contact@jsmastery.com"
                    register={register}
                    error={errors.email}
                    validation={{ required: 'Email name is required', pattern: /^\w+@\w+\.\w+$/, message: 'Email address is required' }}
                    />

                <InputField
                    name="password"
                    label="Password"
                    placeholder="Enter a strong password"
                    type="password"
                    register={register}
                    error={errors.password}
                    validation={{ required: 'Password is required', minLength: 8 }}
                />

                <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                    {isSubmitting ? 'Sining in' : 'Sing in'}
                </Button>

                <FooterLink text="Don't have an account yet?" linkText="Create an Account" href="/sign-up" />

                    </form>
      
    </div>
  )
}

export default SignIn