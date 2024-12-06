import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";
import { useSelector, useDispatch } from "react-redux";
import { listHelp } from "../../redux/actions/helpAction";

const PrivacyPolicyScreen = () => {
  const dispatch = useDispatch();
  const listHelpDescriptionState = useSelector(
    (state) => state.listHelpDescription
  );
  const { descriptions } = listHelpDescriptionState;
  useEffect(() => {
    dispatch(listHelp("privacy"));
  }, []);
  return (
    <Layout>
      <PageTitle
        title="Privacy Policy"
        // description="Romonia Description"
        button="Edit"
        link={`/edit-privacy/${descriptions && descriptions.uuid}`}
      />
      <div className="card">
        <div class="card-body">
          <div class="card-title mb-4">
            {/* {descriptions && descriptions.description} */}
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

export default PrivacyPolicyScreen;
