import {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {

  const [formdata,setFormdata]=useState({username:"",email:"",password:""})
  const navigate=useNavigate()

  const handleChange=(e)=>{

    setFormdata({...formdata,[e.target.name]:e.target.value})

  }
  const handleSubmit =async(e)=>{
    e.preventDefault()
    console.log(formdata)
    try{
        const res= await axios.post("http://localhost:3000/api/user/signup",formdata)
        console.log(res)

        if (res.success === false) {
          toast.error(res.message);
            
            return ;
          }
          toast.success('Signup successful');
          navigate("/login")    
              }
    catch(error){
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.log(error)

    }
  }
  return (
    <>
         <ToastContainer position='top-center' />

    <section className="min-h-screen flex items-stretch text-white">
    <div
      className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)',
      }}
    >
      <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
      <div className="w-full px-24 z-10">
        <h1 className="text-5xl font-bold text-left tracking-wide">
          Keep it special
        </h1>
        <p className="text-3xl my-4">
          Capture your personal memory in a unique way, anywhere.
        </p>
      </div>
      <div className="bottom-0 absolute p-4 text-center right-0 left-0 flex justify-center space-x-4">
        <span>
          <svg
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
          </svg>
        </span>
        <span>
          <svg
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
          </svg>
        </span>
        <span>
          <svg
            fill="#fff"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </span>
      </div>
    </div>
    <div
      className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0 text-black"
      style={{ backgroundColor: '#ffffff' }}
    >
      <div className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)',
        }}
      >
        <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
      </div>
      <div className="w-full py-6 z-20">
        {/* <h1 className="my-6">
          <svg
            viewBox="0 0 247 31"
            className="w-auto h-7 sm:h-8 inline-flex"
          >
            <path
              fill="rgba(99,102,241, .8)"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.759-10.146-2.553 3.382-5.529 4.65-8.931 3.805-1.941-.482-3.329-1.882-4.864-3.432C35.736 2.916 32.84 0 25.517 0ZM88.517 0C81.712 0 77.46 3.382 75.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.759-10.146-2.553 3.382-5.529 4.65-8.931 3.805-1.941-.482-3.329-1.882-4.864-3.432C98.736 2.916 95.84 0 88.517 0ZM52.159 0l-9.524 31H34.234L24.710 0h7.277l6.271 25.43L44.803 0h7.356Zm58.819 0c-7.964 0-12.216 3.382-13.918 10.146 2.553-3.382 5.592-4.65 9.156-3.805 1.874.482 3.324 1.882 4.856 3.432 2.44 2.524 5.346 5.445 11.651 5.445 6.722 0 10.974-3.382 12.676-10.146-2.552 3.382-5.591 4.65-9.156 3.805-1.874-.482-3.324-1.882-4.856-3.432C121.86 2.916 118.955 0 111.778 0ZM165.517 0C158.712 0 154.46 3.382 152.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.759-10.146-2.553 3.382-5.529 4.65-8.931 3.805-1.941-.482-3.329-1.882-4.864-3.432C175.736 2.916 172.84 0 165.517 0ZM228.517 0c-6.805 0-11.057 3.382-12.759 10.146 2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.759-10.146-2.553 3.382-5.529 4.65-8.931 3.805-1.941-.482-3.329-1.882-4.864-3.432C238.736 2.916 235.84 0 228.517 0ZM191.517 0c-7.805 0-12.057 3.382-13.759 10.146 2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.759-10.146-2.553 3.382-5.529 4.65-8.931 3.805-1.941-.482-3.329-1.882-4.864-3.432C201.736 2.916 198.84 0 191.517 0ZM11.357 3.952c-3.177 0-5.833 2.656-5.833 5.833s2.656 5.833 5.833 5.833c3.177 0 5.833-2.656 5.833-5.833S14.534 3.952 11.357 3.952Zm-2.045 4.405v2.857H7.857V8.357h1.455zm.7 0h.3v2.857h-.3V8.357zm.7 0h1.055v2.857H10.7V8.357zM12.529 10a.528.528 0 0 0 .529-.528.528.528 0 0 0-.529-.529.528.528 0 0 0-.529.529c0 .291.238.529.529.529zm-1.988-.056a.528.528 0 0 0 .529-.529.528.528 0 0 0-.529-.529.528.528 0 0 0-.529.529c0 .291.238.529.529.529zM8.786 8.79a.528.528 0 0 0-.528.529c0 .291.238.529.528.529.291 0 .529-.238.529-.529a.528.528 0 0 0-.529-.529zm2.248 1.056a.528.528 0 0 0 .529-.529.528.528 0 0 0-.529-.529.528.528 0 0 0-.529.529c0 .291.238.529.529.529zM12.529 8.79a.528.528 0 0 0-.528.529c0 .291.238.529.528.529.291 0 .529-.238.529-.529a.528.528 0 0 0-.529-.529z"
            />
          </svg>
        </h1> */}
                     <h1 className="text-black text-4xl font-bold mb-10 uppercase"> Sign Up</h1>

        <form onSubmit={handleSubmit} className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
          
        <div className="pb-2 pt-4">
            <input
              type="text"
              name='username'
              placeholder="userName"
              className="block w-full p-4 text-lg rounded-sm bg-slate-200"
              onChange={handleChange}
            />
          </div>
          <div className="pb-2 pt-4">
            <input
              type="email"
              name='email'
              placeholder="Email"
              className="block w-full p-4 text-lg rounded-sm bg-slate-200"
              onChange={handleChange}
            />
          </div>
          <div className="pb-2 pt-4">
            <input
              className="block w-full p-4 text-lg rounded-sm bg-slate-200"
              type="password"
              placeholder="Password"
              name='password'
              onChange={handleChange}

            />
          </div>
          {/* <div className="text-right text-gray-400 hover:underline hover:text-gray-100">
            <a href="#">Forgot your password?</a>
          </div> */}
          {/* <div className="px-4 pb-2 pt-4">
            <button className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none">
              sign in
            </button>
          </div> */}
          
          <div class="">
                          <button  class="mt-4 mb-3 w-full bg-blue-500 hover:bg-green-400 text-white py-2 rounded-md transition duration-100 uppercase font-semibold">Submit</button>
                      
                      </div>

        </form>
        {/* <div  class="flex w-2/3 m-auto space-x-2 justify-center items-end bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md transition duration-100">

<img class=" h-5 cursor-pointer" src="https://i.imgur.com/arC60SB.png" alt=""/>
<button >Or sign-in with google</button>
</div> */}
        <div className="pt-12 pb-12 text-gray-400">
          <p>
            Already Registered?{' '}
            <Link to={'/signup'} className="underline hover:text-gray-100">
              Click here.
            </Link>
          </p>
        </div>
      </div>
    </div>
  </section>
  </>

  )
}

export default Signup