import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';

import usersRouter from './modules/user/user.routes.js';
import farmRouter from './modules/farm/farm.routes.js';
import farmZoneRouter from './modules/farmZones/farmZones.routes.js';
import irrigationRouter from './modules/irrigation/irrigation.routes.js';
import harvestRouter from './modules/harvest/harvest.routes.js';
import fertilizedRouter from './modules/fertilized/fertilized.routes.js';
import incidentsRouter from './modules/incidents/incidents.routes.js';


import cors from 'cors'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/user', usersRouter); 
app.use('/api/farm', farmRouter); 
app.use('/api/farmZone', farmZoneRouter); 
app.use('/api/irrigation', irrigationRouter); 
app.use('/api/harvest', harvestRouter);
app.use('/api/fertilized', fertilizedRouter); 
app.use('/api/incidents', incidentsRouter); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.log(err);
  
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({ error: err.message });
  
});

export default app;
