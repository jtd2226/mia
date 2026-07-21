import { firestore } from 'firebase';

export default async function handler(request, response) {
  const {
    body: { name, email, phone },
  } = request;

  const ID = email || phone;
  if (!ID) {
    return response.status(400).json({ error: 'Email or Phone is required' });
  }

  const user = await firestore
    .collection('users')
    .doc(ID)
    .get()
    .then(doc => {
      if (doc.exists) {
        return doc.data();
      } else {
        return {
          ID,
          Created: new Date().getTime(),
          Presaved: false,
        };
      }
    });

  user.Email = email || user.Email || '';
  user.Phone = phone || user.Phone || '';
  user.Name = name || user.Name || '';

  user.Joined ??= new Date(user.Created).toLocaleDateString();
  user.AcquisitionChannel = 'https://lovpune.com';

  await fetch(`http://ip-api.com/json`)
    .then(res => res.json())
    .then(location => {
      user.City = location.city;
      user.State = location.region;
      user.Country = location.country;
      user.IP = location.query;
      user.location = location;
    })
    .catch(error => console.log(error));

  Object.keys(user).forEach(key => {
    user[key] ??= '';
  });

  return firestore
    .collection('users')
    .doc(email)
    .set(user)
    .then(() => response.status(200).json({ success: true }))
    .catch(error => response.status(500).json({ error }));
}
