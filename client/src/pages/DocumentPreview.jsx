import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";
// import { Document, Page } from "react-pdf";

const DocumentPreview = () => {
  const { logout } = useAuth();
  const params = useParams();
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [document, setDocument] = useState(null);
  console.log(params);

  useEffect(() => {
    fetchDocument();
  }, []);

  const fetchDocument = async () => {
    setIsLoading(true);
    axiosInstance
      .get(`${import.meta.env.VITE_SERVER_URL}/${params.type}/${params.id}`)
      .then((res) => {
        setDocument(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        setErrors(err.message);
        if (err && err.response.status == 401) {
          logout(401);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <h1 className="mx-8 my-4 text-3xl sm:text-4xl bg-opacity-70 rounded-lg font-semibold bg-base-100 p-5 text-center sm:text-left w-max">
        Document
      </h1>
      <div className=" flex flex-grow items-center justify-center">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {document ? (
              <>
                {document.extension == "pdf" ? (
                  <>
                    <embed
                      className="h-full max-w-2xl w-full"
                      src={`data:application/pdf;base64,${document.data}`}
                    />
                  </>
                ) : (
                  <>
                    <div className="bg-base-300 p-5 rounded-xl max-h-full">
                      <img
                        className="h-full aspect-auto"
                        src={`data:image/${document.extension};base64,${document.data}`}
                      />
                    </div>
                  </>
                )}
                {/* <Document file={document.data}>
                <Page pageNumber={1} />
              </Document> */}
              </>
            ) : (
              <>
                <h3 className="bg-base-300 p-6 rounded-xl font-semibold text-6xl">
                  No document found
                </h3>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default DocumentPreview;
