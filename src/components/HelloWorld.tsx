export default function HelloWorld(props: { msg: string }) {

  return (
    <>
      <h1 className="p-10">{props.msg}</h1>

      <p>
        <code> Your personal browsing assistant. </code>
      </p>
    </>
  )
}
