import saleorDarkLogoSmall from "@assets/images/logo-dark-small.svg";
import plusIcon from "@assets/images/plus-icon.svg";
import { Button } from "@dashboard/components/Button";
import CardSpacer from "@dashboard/components/CardSpacer";
import CardTitle from "@dashboard/components/CardTitle";
import Container from "@dashboard/components/Container";
import Hr from "@dashboard/components/Hr";
import Skeleton from "@dashboard/components/Skeleton";
import { AppFetchMutation, AppInstallMutation } from "@dashboard/graphql";
import { SubmitPromise } from "@dashboard/hooks/useForm";
import { buttonMessages } from "@dashboard/intl";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { useStyles } from "../../styles";

export interface AppInstallPageProps {
  data: NonNullable<AppFetchMutation["appFetchManifest"]>["manifest"];
  loading: boolean;
  navigateToAppsList: () => void;
  onSubmit: () => SubmitPromise<
    NonNullable<AppInstallMutation["appInstall"]>["errors"]
  >;
}

export const AppInstallPage: React.FC<AppInstallPageProps> = ({
  data,
  loading,
  navigateToAppsList,
  onSubmit,
}) => {
  const intl = useIntl();
  const classes = useStyles({});

  const name = data?.name || "";

  return (
    <Container>
      <CardSpacer />
      <Card>
        <CardTitle
          title={
            loading ? (
              <Skeleton />
            ) : (
              intl.formatMessage(
                {
                  id: "Id7C0X",
                  defaultMessage: `You are about to install {name}`,
                  description: "section header",
                },
                { name },
              )
            )
          }
        />
        <CardContent className={classes.installCard}>
          {loading ? (
            <Skeleton />
          ) : (
            <div className={classes.installAppContainer}>
              <div
                className={clsx(classes.installIcon, classes.installSaleorIcon)}
              >
                <img src={saleorDarkLogoSmall} alt="" />
              </div>
              <img src={plusIcon} alt="" />
              <div className={classes.installIcon}>
                <h2>{name?.charAt(0).toUpperCase()}</h2>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <CardSpacer />
      <Card>
        <CardTitle
          title={intl.formatMessage({
            id: "VsGcdP",
            defaultMessage: "App permissions",
            description: "section header",
          })}
        />
        <CardContent>
          {loading ? (
            <Skeleton />
          ) : (
            <>
              <Typography className={classes.installPermissionTitle}>
                <FormattedMessage
                  id="BL/Lbk"
                  defaultMessage="Installing this app will give it following permissions:"
                  description="install app permissions"
                />
              </Typography>
              {!!data?.permissions?.length && (
                <ul className={classes.permissionsContainer}>
                  {data?.permissions?.map(perm => (
                    <li key={perm.code}>{perm.name}</li>
                  ))}
                </ul>
              )}
              <Hr className={classes.installSpacer} />

              <Typography
                variant="body2"
                className={classes.installPrivacyText}
              >
                <FormattedMessage
                  id="t1UYU6"
                  defaultMessage="Uninstalling the app will remove all your customer’s personal data stored by {name}. "
                  description="install app privacy"
                  values={{ name }}
                />
                {!!data?.dataPrivacyUrl && (
                  <a
                    href={data?.dataPrivacyUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <FormattedMessage
                      id="k5lHFp"
                      defaultMessage="Learn more about data privacy"
                      description="app data privacy link"
                    />
                  </a>
                )}
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
      <CardSpacer />
      <Grid container justify="space-between">
        <Grid xs={6} item>
          <Button variant="secondary" onClick={navigateToAppsList}>
            <FormattedMessage {...buttonMessages.cancel} />
          </Button>
        </Grid>
        <Grid xs={6} item className={classes.alignRight}>
          <Button variant="primary" onClick={onSubmit}>
            <FormattedMessage
              id="PkCmGU"
              defaultMessage="Install App"
              description="install button"
            />
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

AppInstallPage.displayName = "AppInstallPage";
export default AppInstallPage;
