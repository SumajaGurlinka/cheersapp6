import axios from "axios";

export const login = {
  state: {
    loginData: [],
    downloadallData: [],
    submitData: [],
    saveData:[],
    draftsData:[]
  },
  reducers: {
    setLogin: (state, payload) => {
      return {
        ...state,
        loginData: payload,
      };
    },
    setSubmit: (state, payload) => {
      return {
        ...state,
        submitData: payload,
      };
    },
    setDrafts: (state, payload) => {
      return {
        ...state,
        draftsData: payload,
      };
    },
    setSave: (state, payload) => {
      return {
        ...state,
        saveData: payload,
      };
    },
    setDownloadAll: (state, payload) => {
      return {
        ...state,
        downloadallData: payload,
      };
    },
  },
  effects: (dispatch) => ({
    getLoginAsync: async (payload1, rootState) => {
      try {
        console.log("login entered");
        let body = payload1;
        console.log("2", payload1);
        const url = "https://dev-auth.senecaglobal.in/get_access_token";

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axios.post(url, body, config);
        console.log("2", response);

        const { data = undefined } = response;

        if (data) {
          localStorage.setItem("token", data.data.access_token);

          console.log("authdata", data.data.access_token);

          dispatch.login.setLogin(data);
        }
      } catch (error) {
        console.log("Api > Error >Login >  ", error.response);
        throw error;
      }
    },
    getDownloadAllAsync: async () => {
      try {
        const url = "http://localhost:9090/card/zip?ids=100007&id=100009";

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axios.get(url, config);

        const { data = undefined } = response;

        if (data) {
          dispatch.login.setDownloadAll(data);
        }
      } catch (error) {
        console.log("Api > Error >Login >  ", error.response);
        throw error;
      }
    },
    getSubmitAsync: async ({ receiverName, category, cardMessage }) => {
      try {
        console.log(category)
        const url =
        
          ` http://localhost:9090/card/sendcard?receiverName=${receiverName}&category=${category}&cardMessage=${cardMessage}`;
          console.log(url);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axios.post(url, config);

        const { data = undefined } = response;

        if (data) {
          dispatch.login.setSubmit(data);
        }
      } catch (error) {
        console.log("Api > Error >Login >  ", error.response);
        throw error;
      }
    },
    getSaveAsync: async ({ receiverName, category, cardMessage }) => {
      try {
        console.log(category)
        const url =
       
          ` http://localhost:9090/card/savecard?receiverName=${receiverName}&category=${category}&cardMessage=${cardMessage}`;
          console.log(url);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axios.post(url, config);

        const { data = undefined } = response;

        if (data) {
          dispatch.login.setSave(data);
        }
      } catch (error) {
        console.log("Api > Error >save >  ", error.response);
        throw error;
      }
    },
    getDraftsAsync: async ({ searchText, pageNumber, pageSize,sortDirection ,sortBy}) => {
      try {
        console.log("searchText");
        const url =
       
          ` http://localhost:9090/card/draftcards?searchText=${searchText}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortDirection=${sortDirection}&sortBy=${sortBy}`;
          console.log(url);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axios.get(url, config);
console.log("dss");
        const { data = undefined } = response;

        if (data) {
          console.log("data",data);
          dispatch.login.setDrafts(data);
        }
      } catch (error) {
        console.log("Api > Error >drafts >  ", error.response);
        throw error;
      }
    },
  }),
  
};
