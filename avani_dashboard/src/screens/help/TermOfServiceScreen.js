import React from "react";
import { useEffect } from "react";
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";
import { listHelp } from "../../redux/actions/helpAction";
import { useSelector, useDispatch } from "react-redux";

const TermOfServiceScreen = () => {
  const dispatch = useDispatch();
  const listHelpDescriptionState = useSelector(
    (state) => state.listHelpDescription
  );
  const { descriptions } = listHelpDescriptionState;
  useEffect(() => {
    dispatch(listHelp("terms"));
  }, []);
  return (
    <Layout>
      <PageTitle
        title="Terms Of Service"
        // description="Romonia Description"
        button="Edit"
        link={`/edit-terms/${descriptions && descriptions.uuid}`}
      />
      <div className="card">
        <div class="card-body">
          <div class="card-title mb-4">
            <div
              dangerouslySetInnerHTML={{
                __html: descriptions && descriptions.description,
              }}
            ></div>
          </div>

          {/* <!-- end row --> */}
        </div>
      </div>
    </Layout>
  );
};

export default TermOfServiceScreen;
