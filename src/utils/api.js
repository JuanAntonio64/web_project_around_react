class Api {

    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }

    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
        headers: this.headers,
        method: 'GET'
        })
        .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
        });
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
        headers: this.headers,
        method: 'GET'   
        })
        .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
        });
    }

    editProfile(name, job) {
        return fetch(`${this.baseUrl}/users/me`, {
        headers: this.headers,
        method: 'PATCH',
        body: JSON.stringify({
            name: name,
            about: job
        })
        })
        .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
        });
    }

    createCard(name, link) {
        return fetch(`${this.baseUrl}/cards`, {
        headers: this.headers,
        method: 'POST',
        body: JSON.stringify({
            name: name,
            link: link
        })
        })
        .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
        });
    }

    likeCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        headers: this.headers,
        method: 'PUT'
        })
        .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
        });
    }

    deleteLikeCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        headers: this.headers,
        method: 'DELETE'
        })
        .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
        });
    }

    deleteCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
        headers: this.headers,
        method: 'DELETE'
        })
        .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
        });
    }

    setUserAvatar(avatarUrl) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
        headers: this.headers,
        method: 'PATCH',
        body: JSON.stringify({
            avatar: avatarUrl
        })
})
        .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
        });
    }

    changeLikeCardStatus(cardId, isLiked) {
        return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: isLiked ? "PUT" : "DELETE",
            headers: this.headers,
        }).then((res) => {
            if (res.ok) {
            return res.json();
            }
            return Promise.reject(`Error: ${res.status}`);
        });
    }



  // otros métodos para trabajar con la API
}

export const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1/",
  headers: {
    authorization: "58798428-6e82-40c7-bb4a-8511e9363a67",
    "Content-Type": "application/json"
  }
});

