// import Home from "./home"
import Link from "next/link"
function Index() {
  return (
    <>
      <h1>This is Index Page.</h1>
      {/* <Home /> */}
      <Link href="/home" > Home </Link>
    </>
  )
}

export default Index