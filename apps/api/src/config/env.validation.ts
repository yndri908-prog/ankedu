import { plainToInstance } from 'class-transformer';
import { IsIn, IsNotEmpty, IsOptional, IsString, MinLength, validateSync } from 'class-validator';

/**
 * Les variables d'environnement sont validees au demarrage.
 * Une application qui demarre avec un secret manquant est une application
 * qui tombera en production, pas en developpement.
 */
class EnvironmentVariables {
  @IsIn(['development', 'test', 'production'])
  NODE_ENV!: string;

  @IsOptional()
  @IsString()
  PORT?: string;

  @IsNotEmpty()
  @IsString()
  DATABASE_URL!: string;

  @IsString()
  @MinLength(32, { message: 'JWT_ACCESS_SECRET doit faire au moins 32 caracteres.' })
  JWT_ACCESS_SECRET!: string;

  @IsString()
  @MinLength(32, { message: 'JWT_REFRESH_SECRET doit faire au moins 32 caracteres.' })
  JWT_REFRESH_SECRET!: string;

  @IsNotEmpty()
  @IsString()
  WEB_ORIGIN!: string;
}

export function validateEnv(config: Record<string, unknown>) {
  const parsed = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(parsed, { skipMissingProperties: false });

  if (errors.length > 0) {
    const details = errors
      .map((error) => Object.values(error.constraints ?? {}).join(', '))
      .join('\n  - ');
    throw new Error(`Configuration invalide :\n  - ${details}`);
  }

  return config;
}
