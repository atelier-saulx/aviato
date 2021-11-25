import { useRouter } from 'next/router'

const Comment = () => {
  const router = useRouter()
  const { section } = router.query

  return (
    <>
      <div>Sub-Section</div>
      <div>Section: {section}</div>
    </>
  )
}

export default Comment
