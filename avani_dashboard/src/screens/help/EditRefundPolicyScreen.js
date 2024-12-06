import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import PageTitle from "../../components/PageTitle";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { listHelp, updateHelp } from "../../redux/actions/helpAction";
import { useEffect } from "react";
import { HELP_UPDATE_RESET } from "../../redux/constants/helpConstant";

const EditRefundPolicyScreen = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [description, setDescription] = useState("");

  const listHelpDescriptionState = useSelector(
    (state) => state.listHelpDescription
  );
  const { descriptions } = listHelpDescriptionState;
  const helpDescriptionEditState = useSelector(
    (state) => state.helpDescriptionEdit
  );
  const { success } = helpDescriptionEditState;

  useEffect(() => {
    dispatch(listHelp("refund"));
    if (success) {
      navigate("/refund-policy");
      dispatch({ type: HELP_UPDATE_RESET });
    }
  }, [success]);

  const handleCkEditorChange = (e, editor) => {
    setDescription(editor.getData());
  };

  const handleContactusForm = (e) => {
    e.preventDefault();
    dispatch(updateHelp(description, uuid));
  };

  return (
    <Layout>
      <PageTitle title="Edit Contact Us Page" />
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleContactusForm}>
            <div className="row mb-3">
              <CKEditor
                editor={ClassicEditor}
                class="form-control"
                placeholder="Description of Job"
                style={{ width: "100%" }}
                onChange={(e, editor) => {
                  handleCkEditorChange(e, editor);
                }}
                data={descriptions && descriptions.description}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Edit ContactUs
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditRefundPolicyScreen;
