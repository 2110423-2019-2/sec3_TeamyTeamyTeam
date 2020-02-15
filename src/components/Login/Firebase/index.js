// eslint-disable-next-line jsx-a11y/href-no-hash
import firebase from 'firebase/app'
import 'firebase/auth'
import config from './login_config'

if (!firebase.apps.length) {
    firebase.initializeApp(config)
}

export default firebase.auth()