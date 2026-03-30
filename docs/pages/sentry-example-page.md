---
lang: fr-FR
title: Sentry (exemple)
description: Documentation de la page /sentry-example-page dans Sesame-Orchestrator
---

# Sentry (exemple)

Cette page est un **exemple** pour tester la remontée d’erreurs vers Sentry (route `/sentry-example-page`).

## Contenu de l’interface

- Un bouton “Trigger Error”.

## Comportement

- Au clic, une exception JavaScript est levée (`throw new Error('Nuxt Button Error')`).
- Utile pour valider que le SDK Sentry est bien configuré et que les erreurs front remontent.

