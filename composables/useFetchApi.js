export default (url, option = {}) => {

  const {useAuthToken} = useAuth();

  return $fetch(url, {
    ...option,
    headers: {
      ...option.headers,
      Authorization: `Bearer ${useAuthToken().value}`
    }
  }) 
}