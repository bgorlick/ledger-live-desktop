// @flow
import React, { PureComponent } from 'react'
import { translate } from 'react-i18next'
import { colors } from 'styles/theme'

import Box from 'components/base/Box'

import type { T } from 'types/common'
import IconLedgerBlueSelectPIN from 'icons/illustrations/LedgerBlueSelectPIN'

import IconChevronRight from 'icons/ChevronRight'

import { IconOptionRow, DisclaimerBox, OptionRow, Inner } from '../../helperComponents'

type Props = {
  t: T,
}

class SelectPIN extends PureComponent<Props, *> {
  render() {
    const { t } = this.props

    const stepsLedgerBlue = [
      {
        key: 'step1',
        icon: <IconOptionRow>1.</IconOptionRow>,
        desc: t('onboarding:selectPIN.instructions.ledgerBlue.step1'),
      },
      {
        key: 'step2',
        icon: <IconOptionRow>2.</IconOptionRow>,
        desc: t('onboarding:selectPIN.instructions.ledgerBlue.step2'),
      },
      {
        key: 'step3',
        icon: <IconOptionRow>3.</IconOptionRow>,
        desc: t('onboarding:selectPIN.instructions.ledgerBlue.step3'),
      },
    ]

    const disclaimerNotes = [
      {
        key: 'note1',
        icon: <IconChevronRight size={12} style={{ color: colors.smoke }} />,
        desc: t('onboarding:selectPIN.disclaimer.note1'),
      },
      {
        key: 'note2',
        icon: <IconChevronRight size={12} style={{ color: colors.smoke }} />,
        desc: t('onboarding:selectPIN.disclaimer.note2'),
      },
      {
        key: 'note3',
        icon: <IconChevronRight size={12} style={{ color: colors.smoke }} />,
        desc: t('onboarding:selectPIN.disclaimer.note3'),
      },
    ]

    return (
      <Box align="center">
        <Inner style={{ width: 700 }}>
          <Box style={{ width: 260, justifyContent: 'center', alignItems: 'center' }} mt={2}>
            <IconLedgerBlueSelectPIN />
          </Box>
          <Box mt={4}>
            <Box shrink grow flow={4}>
              {stepsLedgerBlue.map(step => <OptionRow key={step.key} step={step} />)}
            </Box>
          </Box>
        </Inner>
        <DisclaimerBox mt={6} disclaimerNotes={disclaimerNotes} />
      </Box>
    )
  }
}

export default translate()(SelectPIN)
