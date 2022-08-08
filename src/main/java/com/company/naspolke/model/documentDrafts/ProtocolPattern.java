package com.company.naspolke.model.documentDrafts;

import org.springframework.stereotype.Component;

@Component
class ProtocolPattern {

    static String resolutionPattern = "Uchwała nr %s \n%s  Zgromadzenia Wspólników %s z siedzibą %s\nz dnia %s \nw sprawie %s\n";

    static String resolutionChairpersonText = "%s Zgromadzenie Wspólników pod firmą %s " +
            "z siedzibą %s postanawia, że zgromadzeniu przewodniczyć będzie %s %s.";

    static String resolutionRecorderText = "%s Zgromadzenie Wspólników pod firmą %s " +
            "z siedzibą %s postanawia, że zgromadzenie protokołować będzie %s %s.";
    static String ResolutionVotingUnanimously = "Po podliczeniu głosów, przewodniczący stwierdził, że:\n" +
            "w głosowaniu %s jednogłośnie przyjęto powyższą uchwałę.";

    static String resolutionVotingNotUnanimously = "Po podliczeniu głosów, przewodniczący stwierdził, że:\n" +
            "w głosowaniu %s brało udział łącznie %s %s, przy czym %s %s „za”, %s %s „przeciw”, %s %s „wstrzymujących się”\n" +
            "Przewodniczący stwierdził, że uchwała %s została przyjęta oraz nie zgłoszono sprzeciwów \n";

    static String protocolAttendanceInfo = "Lista obecności, zawierająca spis uczestników %s Zgromadzenia Wspólników, " +
            "sporządzona została niezwłocznie po objęciu funkcji przez przewodniczącego, a następnie przez niego podpisana i " +
            "wyłożona podczas Zgromadzenia. Listę tę podpisaną przez uczestników Zgromadzenia oraz przewodniczącego i protokolanta " +
            "załączono do niniejszego protokołu.\n\n";

    static String meetingValidationFormula = "Przewodniczący Zgromadzenia stwierdził, że Zgromadzenie odbywa się %s. Obecni " +
            "lub reprezentowani są wspólnicy którym przysługuje łącznie %s i tyle samo głosów, na ogólną liczbę %s " +
            "i tyle samo głosów, co oznacza, że reprezentowany jest na nim %s łącznej ilości udziałów, nadto nikt z obecnych nie " +
            "zgłosił sprzeciwu dotyczącego odbycia Zgromadzenia, a zatem zgodnie z art. %s  Zgromadzenie zdolne jest " +
            "do podejmowania uchwał%s.\n";

    static String conveningUnofficialFormula ="bez formalnego zwołania, lecz obecni lub reprezentowani są wszyscy wspólnicy";
    static String conveningFormalFormula ="za formalnym zwołaniem";

    static String objectionsToTheResolutionsInfo =", o ile nikt z obecnych nie zgłosi sprzeciwu co do wniesienia poszczególnych spraw do porządku obrad";
    //typZgromadzenia, formalneZwołanie, reprezentowani są wszyscy wspólnicy, łączna liczba udziałów,  słownie,
    // forma udziały, ogólna liczba udziałów, słownie, forma udziały
//    static String chairpersonResolutionTitle = "wyboru Przewodniczącego Zgromadzenia";
//    static String recorderResolutionTitle = "wyboru Protokolanta";
}
