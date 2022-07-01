import Link from 'next/link'
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from 'react';
import {useRouter} from 'next/router';
import axios from 'axios';

export default function Home() {
  const { user, error, isLoading } = useUser();
  //const [student, setStudent] = useState("");
  const router = useRouter();

  useEffect(() => {
    console.log("I hit useEffect");
    console.log(user);

    const fetchStudent = async() => {
      const response = await axios.get(`http://localhost:5000/api/v1/consumer/fetch/student/${user.email}`)
        .catch(function (error) {
          if (error.response) {
            console.log("just ignore ");
            router.push("/signup");
          } else if (error.request) {
            console.log("ignore even more")
          } else {
            console.log("yes ignore this too!")
          }
      });

      if(response) {
        console.log(response.data);
        //setStudent(response.data.id);
        const student = response.data;
        console.log(student);

        router.push('/profile');
      }
    }
    if(user) {
      fetchStudent();
    }

    
  }, [user])

  return (
    <div>
      <Link href = "/api/auth/login"> Log in </Link>
      <Link href="/api/auth/logout">Logout</Link>
    </div>
  )
}
