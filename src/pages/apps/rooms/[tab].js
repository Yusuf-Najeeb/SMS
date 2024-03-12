
import RoomsTab from '../../../views/users/rooms/RoomsTab'


const Rooms = ({ tab }) => {
  return <RoomsTab tab={tab} />
}

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { tab: 'rooms' } },
      { params: { tab: 'categories' } },
    ],
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {
  return {
    props: {
      tab: params?.tab
    }
  }
}

export default Rooms
