import KrsUserInput from "./krsInput/KrsUserInput";
import CompanyForm from "./companyForm/CompanyForm";
import {useState} from "react";
import {ModalErrorMessage} from "./companyForm/formComponents/ModalFormError";
import {Company} from "../../classes/company/Company";
import Axios from "axios";

const AddCompany = ()=>{
    const [companyDataForm, setCompanyDataForm] = useState(<div/>);

    const hideModal = () => {
      setCompanyDataForm(<div/>);
    }

    const addCompanyForm = (data) => {
        if (data === 404) {
            setCompanyDataForm(<ModalErrorMessage hide={hideModal}
                                                  messageTitle="Nie znaleziono.."
                                                  message="Nie znaleziono firmy o podanym numerze KRS \n Sprawdź jego popranowność lub uzupełnij dane samodzielnie"
                                                  closeAndDisplay={closeAndDisplay}/>)
        } else if (data.length === 3) {
            setCompanyDataForm(<ModalErrorMessage hide={hideModal}
                                                  messageTitle={"Problem.."}
                                                  message={"Wystąpił problem z połaczeniem \n Możesz spróbować później lub uzupełnic dane samodzielnie"}
                                                  closeAndDisplay={closeAndDisplay}/>)
        } else if (data.data===null){
            setCompanyDataForm(<ModalErrorMessage hide={hideModal}
                                                  messageTitle={"Problem.."}
                                                  message={"Ta spółka została już dodana. Sprawdź Twoje repozytorium"}
                                                  closeAndDisplay={closeAndDisplay}/>)
        } else {
              const company = checkForCompanyData(data.data)
              setCompanyDataForm(<CompanyForm company={company} saveData={saveDataIntoDb}/>);
          }
      }

    function saveDataIntoDb(data){
        Axios.post("http://localhost:8080/add-company/",data)
            .then(response=>console.log(response))
            .catch(error=>{
                console.log(error)
            })
    }

    const closeAndDisplay = () => {
        setCompanyDataForm(<CompanyForm companyData={null}/>)
    }

    function checkForCompanyData(data) {
        if (data !== null) {
            return new Company(data)
        } else {
            return null;
        }
    }
    return <div>
        <KrsUserInput addCompanyData={addCompanyForm}/>
        {companyDataForm}
    </div>
}

export default AddCompany;