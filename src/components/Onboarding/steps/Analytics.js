// @flow

import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { saveSettings } from 'actions/settings'

import Box from 'components/base/Box'
import CheckBox from 'components/base/CheckBox'
import { Title, Description } from '../helperComponents'
import OnboardingFooter from '../OnboardingFooter'

import type { StepProps } from '..'

const mapDispatchToProps = { saveSettings }

type State = {
  analyticsToggle: boolean,
  termsConditionsToggle: boolean,
  sentryLogsToggle: boolean,
}
class Analytics extends PureComponent<StepProps, State> {
  state = {
    analyticsToggle: false,
    termsConditionsToggle: false,
    sentryLogsToggle: false,
  }
  handleSentryLogsToggle = (isChecked: boolean) => {
    this.setState({ sentryLogsToggle: !this.state.sentryLogsToggle })
    this.props.saveSettings({
      sentryLogs: isChecked,
    })
  }
  handleAnalyticsToggle = (isChecked: boolean) => {
    this.setState({ analyticsToggle: !this.state.analyticsToggle })
    this.props.saveSettings({
      shareAnalytics: isChecked,
    })
  }
  handleTermsToggle = () => {
    this.setState({ termsConditionsToggle: !this.state.termsConditionsToggle })
  }
  render() {
    const { nextStep, prevStep, t } = this.props
    const { analyticsToggle, termsConditionsToggle, sentryLogsToggle } = this.state

    return (
      <Box sticky pt={170}>
        <Box grow alignItems="center">
          <Title>{t('onboarding:analytics.title')}</Title>
          <Description>{t('onboarding:analytics.desc')}</Description>
          <Box mt={5}>
            <Container>
              <Box justify="center" style={{ width: 450 }}>
                <Box horizontal>
                  <AnalyticsTitle>{t('onboarding:analytics.sentryLogs.title')}</AnalyticsTitle>
                </Box>
                <AnalyticsText>{t('onboarding:analytics.sentryLogs.desc')}</AnalyticsText>
              </Box>
              <Box alignItems="center" horizontal mx={5}>
                <CheckBox isChecked={sentryLogsToggle} onChange={this.handleSentryLogsToggle} />
              </Box>
            </Container>
            <Container>
              <Box justify="center" style={{ width: 450 }}>
                <Box horizontal>
                  <AnalyticsTitle>{t('onboarding:analytics.shareAnalytics.title')}</AnalyticsTitle>
                </Box>
                <AnalyticsText>{t('onboarding:analytics.shareAnalytics.desc')}</AnalyticsText>
              </Box>
              <Box alignItems="center" horizontal mx={5}>
                <CheckBox isChecked={analyticsToggle} onChange={this.handleAnalyticsToggle} />
              </Box>
            </Container>
            <Container>
              <Box justify="center" style={{ width: 450 }}>
                <Box horizontal>
                  <AnalyticsTitle>{t('onboarding:analytics.termsConditions.title')}</AnalyticsTitle>
                </Box>
                <AnalyticsText>{t('onboarding:analytics.termsConditions.desc')}</AnalyticsText>
              </Box>
              <Box alignItems="center" horizontal mx={5}>
                <CheckBox isChecked={termsConditionsToggle} onChange={this.handleTermsToggle} />
              </Box>
            </Container>
          </Box>
        </Box>
        <OnboardingFooter
          horizontal
          align="center"
          flow={2}
          t={t}
          nextStep={nextStep}
          prevStep={prevStep}
          isContinueDisabled={!termsConditionsToggle}
        />
      </Box>
    )
  }
}

export default connect(null, mapDispatchToProps)(Analytics)

export const AnalyticsText = styled(Box).attrs({
  ff: 'Open Sans|Regular',
  fontSize: 3,
  textAlign: 'left',
  color: 'smoke',
})`
  max-width: 450px;
`
export const AnalyticsTitle = styled(Box).attrs({
  ff: 'Open Sans|SemiBold',
  fontSize: 4,
  textAlign: 'left',
})`
  margin-bottom: 5px;
`
const Container = styled(Box).attrs({
  horizontal: true,
  p: 3,
})``
