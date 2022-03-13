export async function newUser(metadata, jwtToken) {
  const operationsDoc = `
  query getUser {
    users {
      email
      id
      issuer
      publicAddress
    }
  }
`;

  function fetchGetUser() {
    return fetchGraphQL(
      operationsDoc,
      "getUser",
      {},
      metadata.issuer,
      jwtToken
    );
  }

  const { errors, data } = await fetchGetUser();
  return data || errors;
}
export async function createUser(metadata, jwtToken) {
  const { email, issuer, publicAddress } = metadata;
  const operationsDoc = `
  mutation createUser($email: String = "", $issuer: String = "", $publicAddress: String = "") {
    insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
      returning {
        email
        issuer
        publicAddress
        id
      }
    }
  }
`;

  function executeCreateUser(email, issuer, publicAddress) {
    return fetchGraphQL(
      operationsDoc,
      "createUser",
      {
        email: email,
        issuer: issuer,
        publicAddress: publicAddress,
      },
      metadata.issuer,
      jwtToken
    );
  }
  const { errors, data } = await executeCreateUser(
    email,
    issuer,
    publicAddress
  );
  return data || errors;
}
export async function getMovieByIdGql(userId, movieId, jwtToken) {
  const operationsDoc = `
  query getMovieById($userId: String!, $videoId: String!) {
    stats(where: {videoId: {_eq: $videoId}, userId: {_eq: $userId}}) {
      favourited
      userId
      videoId
      watched
    }
  }
`;

  function fetchMyQuery() {
    return fetchGraphQL(
      operationsDoc,
      "getMovieById",
      {
        userId: userId,
        videoId: movieId,
      },
      userId,
      jwtToken
    );
  }
  const { errors, data } = await fetchMyQuery();
  return data || errors;
}
export async function createMovie(userId, movieId, jwtToken) {
  //while creating new movie the favorite val will be null by default
  const operationsDoc = `
  mutation createMovieRow($userId: String!, $videoId: String!) {
    insert_stats(objects: {favourited: null, userId: $userId, videoId: $videoId, watched: true}) {
      affected_rows
    }
  }
`;

  function executeCreateMovieRow() {
    return fetchGraphQL(
      operationsDoc,
      "createMovieRow",
      {
        userId: userId,
        videoId: movieId,
      },
      userId,
      jwtToken
    );
  }
  const { errors, data } = await executeCreateMovieRow();
  return data || errors;
}
export async function updateMovie(userId, movieId, jwtToken, favourited) {
  const operationsDoc = `
  mutation updateMovieRow($videoId: String!, $userId:String! , $favourited: Int!) {
    update_stats(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}, _set: {favourited: $favourited}) {
      returning {
        favourited
        videoId
      }
    }
  }
`;

  function fetchMyQuery() {
    return fetchGraphQL(
      operationsDoc,
      "updateMovieRow",
      {
        userId: userId,
        videoId: movieId,
        favourited: favourited,
      },
      userId,
      jwtToken
    );
  }
  const { errors, data } = await fetchMyQuery();
  return data || errors;
}
export async function getUserWatchedMovies(userId,jwtToken) {
  const operationsDoc = `
  query getMovie ($userId : String!) {
    stats(where: {userId: {_eq: $userId}}) {
      videoId
    }
  }
`;

  function fetchMyQuery() {
    return fetchGraphQL(
      operationsDoc,
      "getMovie",
      {
        userId: userId,
      },
      userId,
      jwtToken
    );
  }
  const { errors, data } = await fetchMyQuery();
  return data || errors;
}
export async function getUserLikedMovies(userId,jwtToken) {
  const operationsDoc = `
  query getLiked ($userId : String!){
    stats(where: {userId: {_eq: $userId}, favourited: {_eq: 1}}) {
      videoId
    }
  }
`;

  function fetchMyQuery() {
    return fetchGraphQL(
      operationsDoc,
      "getLiked",
      {
        userId: userId,
      },
      userId,
      jwtToken
    );
  }
  const { errors, data } = await fetchMyQuery();
  return data || errors;
}




async function fetchGraphQL(
  operationsDoc,
  operationName,
  variables,
  issuer,
  userJwt
) {
  const result = await fetch("https://sound-kiwi-62.hasura.app/v1/graphql", {
    method: "POST",
    headers: {
      "X-Hasura-User-Id": `${issuer}`,
      Authorization: `Bearer ${userJwt}`,
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  return await result.json();
}
