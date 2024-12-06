import React from "react";
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";
import { useSelector, useDispatch } from "react-redux";
import { listHelp } from "../../redux/actions/helpAction";
import { useEffect } from "react";

const RefundPolicyScreen = () => {
  const dispatch = useDispatch();
  const listHelpDescriptionState = useSelector(
    (state) => state.listHelpDescription
  );
  const { descriptions } = listHelpDescriptionState;
  useEffect(() => {
    dispatch(listHelp("refund"));
  }, []);
  return (
    <Layout>
      <PageTitle
        title="Refund Policy"
        // description="Romonia Description"
        button="Edit"
        link={`/edit-refund/${descriptions && descriptions.uuid}`}
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

export default RefundPolicyScreen;
