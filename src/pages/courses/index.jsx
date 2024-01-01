import SEO from '../../components/seo';
import { Wrapper } from '../../layout';
// import CourseStyleOneMain from './components/course-style-1';
// import AcUnitIcon from '@mui/icons-material/AcUnit';
// import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
// import AddAlarmIcon from '@mui/icons-material/AddAlarm';
// import { Menu } from 'antd';
// function getItem(label, key, icon, children, type) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//     type,
//   };
// }

// const items = [
//     getItem('Navigation One', 'sub1', <AcUnitIcon />, [
//       getItem('Item 1', null, null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
//       getItem('Item 2', null, null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
//     ]),
//     getItem('Navigation Two', 'sub2', <AccessTimeFilledIcon />, [
//       getItem('Option 5', '5'),
//       getItem('Option 6', '6'),
//       getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
//     ]),
//     getItem('Navigation Three', 'sub4', <AddAlarmIcon />, [
//       getItem('Option 9', '9'),
//       getItem('Option 10', '10'),
//       getItem('Option 11', '11'),
//       getItem('Option 12', '12'),
//     ]),
//   ];
//   const onClick = (e) => {
//     console.log('click', e);
//   };

const AllCourses = () => {
    return (
        <Wrapper>
            <SEO pageTitle={'All Courses'} />
            {/* <CourseStyleOneMain /> */}

            {/* <Menu
    onClick={onClick}
    style={{
      width: 256,
    }}
    mode="vertical"
    items={items}
  /> */}
        </Wrapper>
    )
}

export default AllCourses;