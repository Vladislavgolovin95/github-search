import { Link } from "react-router-dom"
import { CardProfile } from "src/components/CardProfile/CardProfile"
import { Header } from "src/components/Header/Header"
import { LinkBtn } from "src/components/LinkBtn/LinkBtn"
import { BACK } from "src/constants/constants"

const ProfilePage = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Link to="/">
          <LinkBtn className="link_navigate" text={BACK}/>
        </Link>
        <CardProfile />
      </div>
    </>
  )
};

export default ProfilePage;