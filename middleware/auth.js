export default function ({ store, redirect }) {
  console.log(store.state.auth);
  if (!store.state.auth.user) return redirect('/login')
}
