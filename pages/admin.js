// import admin from 'firebase-admin';

export async function getServerSideProps() {
  // const app =
  //   admin.app('Auth') ??
  //   admin.initializeApp(
  //     {
  //       apiKey: 'AIzaSyC5fGAQMHr4uIOLsOO6y1I-paAYNzrYWn0',
  //       authDomain: 'side-projects-338722.firebaseapp.com',
  //     },
  //     'Auth'
  //   );

  //   const auth = app.auth();
  //   auth.createSessionCookie()

  return {
    props: {},
  };
}

export default function Admin() {
  return <main></main>;
}
