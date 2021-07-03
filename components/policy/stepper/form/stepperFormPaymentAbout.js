import { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { DataContext } from '../../../utils/DataProvider';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold,
  },
}));

const StepperFormPaymentAbout = () => {
  const classes = useStyles();

  const ctx = useContext(DataContext);

  return (
    <Dialog
      open={ctx.openAbout}
      onClose={() => ctx.setOpenAbout((open) => !open)}
    >
      <DialogTitle>About</DialogTitle>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            How can our customers claim their insurance payouts?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <p style={{ textAlign: 'justify' }}>
            We have no concept of <b>insurance claims</b> thanks to our
            blockchain technology. Every eligible policies will be paid out
            within 24 hours of your flight arrival time. Never do you have to
            worry about flight insurance again!
          </p>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            How do we monitor how and when to make an insurance payout?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <p style={{ textAlign: 'justify' }}>
            All you have to do is to buy a policy. Our technology will be
            continuously monitoring the flight details and calculate the payout
            accordingly. Nothing for you to do other than buying a policy!
          </p>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            How do we calculate the insurance premium to be paid?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <p style={{ textAlign: 'justify' }}>
            The insurance premium is calculated as the weighted average of
            flight rating and the airport rating. Flight rating is given 70%
            weightage, whereas the airport rating is given 30% weightage.
          </p>
          <p style={{ textAlign: 'justify' }}>
            Flight rating takes into accord its previous history of
            cancellations, number of delays in 15 minutes, 30 minutes, 45
            minutes and so on. Airport rating takes into accord ratings of all
            the flights that departs from that airport.
          </p>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            Can customers customize their policies?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <p style={{ textAlign: 'justify' }}>
            All our policies are <b>fully customizable policies</b>. You can add
            or remove items to your policy to create a policy that best suits
            you.
          </p>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            Do we value our customers' privacy?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <p style={{ textAlign: 'justify' }}>
            Ofcourse we do! We do not need any of your personal details ever!
            All our policies are stored in the blockchain, so it can viewed by
            anyone.
          </p>
        </AccordionDetails>
      </Accordion>
    </Dialog>
  );
};

export default StepperFormPaymentAbout;
