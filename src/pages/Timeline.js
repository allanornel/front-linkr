import PageContainer from './../components/PageContainer';
import CreatePost from './../components/CreatePost';
import Post from './../components/Post';

function Timeline() {
  const user =  {"id":1,"username":"test","picture":"https://upload.wikimedia.org/wikipedia/commons/a/af/Bananas_%28Alabama_Extension%29.jpg"};
  const data = [
    {
      "id": 5,
      "url": "https://www.npmjs.com/package/url-metadata",
      "description": "teste 3",
      "hashtag": null,
      "likesTotal": "0",
      "title": "url-metadata",
      "image": "https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png",
      "urlDescription": "Request an http(s) url and scrape its metadata.. Latest version: 2.5.0, last published: 2 years ago. Start using url-metadata in your project by running `npm i url-metadata`. There are 11 other projects in the npm registry using url-metadata."
    },
    {
      "id": 4,
      "url": "https://www.devmedia.com.br/oop-object-oriented-programming-languuage/15964",
      "description": "teste 2",
      "hashtag": null,
      "likesTotal": "0",
      "title": "OOP - Object Oriented Programming Languuage",
      "image": "https://arquivo.devmedia.com.br/midiasocial/artigo-devmedia-facebook.jpg",
      "urlDescription": "um pouco sobre OOP - Object Oriented Programming Languuage)"
    },
    {
      "id": 3,
      "url": "https://www.devmedia.com.br/oop-object-oriented-programming-languuage/15964",
      "description": "teste descrição",
      "hashtag": null,
      "likesTotal": "0",
      "title": "OOP - Object Oriented Programming Languuage",
      "image": "https://arquivo.devmedia.com.br/midiasocial/artigo-devmedia-facebook.jpg",
      "urlDescription": "um pouco sobre OOP - Object Oriented Programming Languuage)"
    }
  ]

  return (
    <>
      <PageContainer title={"timeline"}>
        <CreatePost />
        {data.map(post => (
          <Post user={user} data={post} />
        ))}
      </PageContainer>
    </>
  );
}

export default Timeline;