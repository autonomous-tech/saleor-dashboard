import Container from "@dashboard/components/Container";
import PageHeader from "@dashboard/components/PageHeader";
import { LanguageFragment } from "@dashboard/graphql";
import React from "react";
import { useIntl } from "react-intl";

import TranslationsLanguageList from "../TranslationsLanguageList";

export interface TranslationsLanguageListPageProps {
  languages: LanguageFragment[];
}

const TranslationsLanguageListPage: React.FC<TranslationsLanguageListPageProps> = ({
  languages,
}) => {
  const intl = useIntl();

  return (
    <Container>
      <PageHeader
        title={intl.formatMessage({
          id: "GsBRWL",
          defaultMessage: "Languages",
        })}
      ></PageHeader>
      <TranslationsLanguageList languages={languages} />
    </Container>
  );
};
TranslationsLanguageListPage.displayName = "TranslationsLanguageListPage";
export default TranslationsLanguageListPage;
