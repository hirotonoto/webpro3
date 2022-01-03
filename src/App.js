import { useEffect, useState } from "react";
import { fetchImages } from "./api";

function Header() {
    return (
        <header class="hero is-danger">
        <div class="hero-body">
          <p class="title">
          日本大学文理学部情報科学科 Webプログラミングの演習課題
          </p>
          <p class="subtitle">
            5419036 小林洸人
          </p>
        </div>
      </header>
    );
  }
  
  function Image(props) {
    return (
      <div className="card">
        <div className="card-image">
          <figure className="image">
          <img src={props.src} alt="cute dog!" />
          </figure>
        </div>
      </div>
    );
  }
  
  function Loading() {
    return <p>Loading...</p>;
  }
  
  function Gallery(props) {
    const { urls } = props;
    if (urls == null) {
      return <Loading />;
    }
    return (
      <div className="columns is-vcentered is-multiline">
       {urls.map((url) => {
        return (
          <div key={url} className="column is-3">
            <Image src={url} />
          </div>
        );
      })}
      </div>
    );
  }
  
  function Form(props) {
    function handleSubmit(event) {
      event.preventDefault();
      const { breed } = event.target.elements;
      props.onFormSubmit(breed.value);
    }
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="field has-addons">
            <div className="control is-expanded">
              <div className="select is-fullwidth">
                <select name="breed" defaultValue="shiba">
                  <option value="bassetHound">bassetHound</option>
                </select>
              </div>
            </div>
            <div className="control">
              <button type="submit" className="button is-dark">
                Reload
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  function Main() {
    const [urls, setUrls] = useState(null);

    useEffect(() => {
      fetchImages("bassetHound").then((urls) => {
        setUrls(urls);
      });
    }, []);

    function reloadImages(breed) {
      fetchImages(breed).then((urls) => {
        setUrls(urls);
      });
    }
    return (
      <main>
         <section className="section">
        <div className="container">
        <Form onFormSubmit={reloadImages} />
        </div>
      </section>
        <section className="section">
          <div className="container">
          <Gallery urls={urls} />
          </div>
        </section>
      </main>
    );
  }
  
  function Footer() {
    return (
      <footer className="footer">
        <div className="content has-text-centered">
          <p>ランダムに１０枚の画像を表示しています。</p>
          <p>[出典]wikipedia youtube</p>
          <p>
            <a href="https://dog.ceo/dog-api/about">Dog APIへの寄付をお願いします！</a>
          </p>
        </div>
      </footer>
    );
  }
  
  function App() {
    return (
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
  
  export default App;